import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/general.service';
import { UtilsService } from 'src/app/core/utils.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { StandardApiStructureManagerService } from 'src/app/core/standard-api-structure-manager.service';
import { STANDARD_API_STRUCTURE_CONSTANTS } from 'src/app/core/standard-api-structure-const';

export interface DialogData {
}

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  public allProducts: any
  public searchText: any
  public categoriesToSearch = []
  public startPoint = 0
  public endPoint = 20
  public noProducts = false;
  public searchedFor = ''

  constructor(
    private router: Router,
    private generalService: GeneralService,
    private utilService: UtilsService,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    private standardApiStructureManager: StandardApiStructureManagerService
  ) { }

  ngOnInit() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') 
    if (!isLoggedIn || isLoggedIn === 'false') this.logmeout()
    // this.fetchAllProducts()
  }

  clearFilters() {
    this.fetchAllProducts()
  }

  goToScreen(path) {
    this.router.navigate([path])
  }

  logmeout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  fetchAllProducts() {
    this.generalService.getAllProducts().subscribe((response: any) => {
      this.allProducts = response.data || []
      if (this.allProducts.length === 0) {
        this.noProducts = true;
      } else {
        this.noProducts = false;
      }
      this.searchedFor = ''
    }, (error) => {
      this.utilService.showMessage('error', 'Error', 'We are facing issue while getting all products')
    })
  }

  addToFav(data, index, dataIndex) {
    const loggedIn = sessionStorage.getItem('isLoggedIn')
    if (!loggedIn) {
      this.utilService.showMessage('info', 'Info', 'You are not logged into system, Please login first')
      return true
    }
    if (index === '1') {
      const userId = sessionStorage.getItem('user_code')
      const productId = data.product_id
      const json = {
        user_id: userId,
        product_id: productId
      }
      this.generalService.addProductToWishlist(json).subscribe((response: any) => {
        // this.utilService.showMessage('success', 'Success', response.message)
        this.allProducts[dataIndex].starred = 1
      }, (error) => {
        this.utilService.showMessage('error', 'Error', 'We are unable to add this to your wishlist now.')
      })
    }
    if (index === '2') {
      const userId = sessionStorage.getItem('user_code')
      const productId = data.product_id
      const json = {
        user_id: userId,
        product_id: productId
      }
      this.generalService.remvoeProductFromWishlist(json).subscribe((response: any) => {
        // this.utilService.showMessage('success', 'Success', response.message)
        this.allProducts[dataIndex].starred = 0
      }, (error) => {
        this.utilService.showMessage('error', 'Error', 'We are unable to add this to your wishlist now.')
      })
    }
  }

  showProductDetails(data) {
    const dialogRef = this.dialog2.open(ProductFullDetailsDialog, {
      width: '90%',
      height: '500px',
      data: { data }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoriesToSearch = result || []
      this.searchedFor = ''
      this.searchText = ''
      if (this.categoriesToSearch.length > 0 ) this.searchProducts()
    });
  }

  searchProducts() {
    this.searchedFor = '';
    const searchFor = []
    const jsonQueryArray = []
    if (this.categoriesToSearch.length > 0) {
      for (let elem of this.categoriesToSearch) {
        jsonQueryArray.push(this.standardApiStructureManager.getFilterQueryJson('name', STANDARD_API_STRUCTURE_CONSTANTS.PARAM_EQUAL, elem.name))
        searchFor.push(elem.name)
      }
    }
    if (this.searchText) {
      searchFor.push(this.searchText)
      jsonQueryArray.push(this.standardApiStructureManager.getFilterQueryJson('name', STANDARD_API_STRUCTURE_CONSTANTS.PARAM_REGEX, this.searchText))
    }
    let orOpJson = {}
    orOpJson = this.standardApiStructureManager.getArrayOpFilterJson(STANDARD_API_STRUCTURE_CONSTANTS.PARAM_OR, jsonQueryArray)
    let sortJson = {}
    sortJson = this.standardApiStructureManager.getSortJson('name', 'asc')
    let paginationJson = {}
    // paginationJson = this.standardApiStructureManager.getPaginationJson(this.startPoint, this.endPoint)
    // this.startPoint = this.startPoint + this.endPoint
    const queryString = this.standardApiStructureManager.getStandardStructureQueryString(paginationJson, orOpJson, false, sortJson)
    if(jsonQueryArray.length === 0) {
      return true;
    }
    
    for (let elem of searchFor) {
      this.searchedFor = this.searchedFor + ' ' + elem + '...'
    }
    // this.searchedFor = searchFor.join('')
    this.generalService.searchProduct(queryString).subscribe((response) => {
      this.allProducts = response.data || []
      if (this.allProducts.length === 0) {
        this.noProducts = true;
        this.searchedFor = ''
      } else {
        this.noProducts = false;
      }
      this.searchText = ''
    }, (error) => {
      this.utilService.showMessage('error', 'Error', 'We are unable to show you desired result, please try after sometimes')
    })
  }

  showCategoriesDialog() {
    const dialogRef = this.dialog.open(CategoriesDialog, {
      width: '500px',
      height: '500px',
      data: [],
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoriesToSearch = result || []
      if (this.categoriesToSearch.length > 0) this.searchProducts()
    });
  }

}

@Component({
  selector: 'categoriesDialog',
  templateUrl: 'categories-dialog.html',
})
export class CategoriesDialog implements OnInit {

  public selectedParentCategoris = []
  public selectedSubCategories = []
  public listOfCategories
  public listOfChildCategories
  public selectedSearchItems = []

  constructor(
    public dialogRef: MatDialogRef<CategoriesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private utilsService: UtilsService,
    private generalService: GeneralService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getAllCategories()
  }

  searchItems() {
    this.dialogRef.close();
  }

  getAllCategories() {
    this.generalService.getAllCategoris().subscribe((response: any) => {
      const sf = sessionStorage.getItem('sF')
      let data
      if (sf === "1") data = response.data.foodCategories || []
      if (sf === "0") data = response.data.ecommerceCategories || []
      this.listOfCategories = data || []
      if (this.listOfCategories.length === 0) {
        this.utilsService.showMessage('info', 'Info', `We haven't found any categories. Please contact us`)
      }
    }, (error: any) => {
      this.utilsService.showMessage('error', 'Error', `We haven't found any categories. Please contact us`)
    })
  }

  selectParentCat(value) {
    this.listOfChildCategories = value.subChild
    const json = {
      name: value.name,
      category_id: value.category_id
    }
    this.selectedParentCategoris.push(json)
    this.selectedSubCategories = [];
  }

  selectChildCat(value) {
    const json = {
      name: value.name,
      category_id: value.category_id
    }
    this.selectedParentCategoris.push(json)
  }

  addItemToSearch() {
    this.selectedSearchItems = [...this.selectedSubCategories, ...this.selectedParentCategoris, ...this.selectedSearchItems]
    this.selectedParentCategoris = []
    this.selectedSubCategories = []
    this.selectedSearchItems = _.uniqBy(this.selectedSearchItems, 'category_id')
  }

  deleteItemsFromFilter(catId) {
    this.selectedSearchItems.map((item, index) => {
      if (item.category_id === catId) {
        this.selectedSearchItems.splice(index, 1)
      }
    })
  }

}

@Component({
  selector: 'productFullDetails',
  templateUrl: 'product-full-details.html',
})
export class ProductFullDetailsDialog implements OnInit {

  public selectedParentCategoris = []
  public selectedSubCategories = []
  public listOfCategories
  public listOfChildCategories
  public selectedSearchItems = []
  public selectedQuantity = 1

  constructor(
    public dialogRef: MatDialogRef<ProductFullDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private utilsService: UtilsService,
    private generalService: GeneralService) { }

    public productData
    public avilableStocks = []

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.productData = this.data['data']
    if(this.productData.description) {
      this.productData.description = this.productData.description.replace(/['"]+/g, '')
    }
    const sF = sessionStorage.getItem('sF')
    const stocks = sF === "0" ? this.productData.available_stock : 100
    for (let i = 1; i <= 20; i++) {
      this.avilableStocks.push(i)
    }
  }

  searchItems() {
    this.dialogRef.close();
  }

  addToCart(data) {
    if (!sessionStorage.getItem('user_code')) {
      this.utilsService.showMessage('info', 'Info', 'You are not logged into system. Please login first')
      return true;
    }
    const json = {
      user_id: sessionStorage.getItem('user_code'),
      product_id: data.product_id,
      units: this.selectedQuantity
    }
    this.generalService.addToCart(json).subscribe((response: any) => {
      this.utilsService.showMessage('success', 'Success', 'Product added to your cart successfully')
      this.dialogRef.close()
    }, (error: any) => {
      this.utilsService.showMessage('error', 'Error', 'We are facing issue while adding product to your cart')
    })
  }
}