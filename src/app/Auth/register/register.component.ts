import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/general.service';
import { UtilsService } from 'src/app/core/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public showDiv1 = true
  public showDiv2 = false
  public formData = new FormData();

  public days = []
  public months = []
  public years = []
  public toCurrentYears = []
  public toPastYears = []
  public experiece = []
  public fromCurrentYears = []
  public fromPastYears = []
  public designations = ['Developer', 'Engineer', 'CEO', 'Project Manager', 'Doctor', ]
  public qualifications = ["BA", "BCom", "BE", "MA", "MCom", "ME", "BSc", "MSc"]
  public functionalArea = ['HR', 'Marketing', 'Developer', 'Manager', 'Architecture', 'Specialist']
  public countries = [{"name":"Afghanistan","code":"AF"},{"name":"land Islands","code":"AX"},{"name":"Albania","code":"AL"},{"name":"Algeria","code":"DZ"},{"name":"American Samoa","code":"AS"},{"name":"AndorrA","code":"AD"},{"name":"Angola","code":"AO"},{"name":"Anguilla","code":"AI"},{"name":"Antarctica","code":"AQ"},{"name":"Antigua and Barbuda","code":"AG"},{"name":"Argentina","code":"AR"},{"name":"Armenia","code":"AM"},{"name":"Aruba","code":"AW"},{"name":"Australia","code":"AU"},{"name":"Austria","code":"AT"},{"name":"Azerbaijan","code":"AZ"},{"name":"Bahamas","code":"BS"},{"name":"Bahrain","code":"BH"},{"name":"Bangladesh","code":"BD"},{"name":"Barbados","code":"BB"},{"name":"Belarus","code":"BY"},{"name":"Belgium","code":"BE"},{"name":"Belize","code":"BZ"},{"name":"Benin","code":"BJ"},{"name":"Bermuda","code":"BM"},{"name":"Bhutan","code":"BT"},{"name":"Bolivia","code":"BO"},{"name":"Bosnia and Herzegovina","code":"BA"},{"name":"Botswana","code":"BW"},{"name":"Bouvet Island","code":"BV"},{"name":"Brazil","code":"BR"},{"name":"British Indian Ocean Territory","code":"IO"},{"name":"Brunei Darussalam","code":"BN"},{"name":"Bulgaria","code":"BG"},{"name":"Burkina Faso","code":"BF"},{"name":"Burundi","code":"BI"},{"name":"Cambodia","code":"KH"},{"name":"Cameroon","code":"CM"},{"name":"Canada","code":"CA"},{"name":"Cape Verde","code":"CV"},{"name":"Cayman Islands","code":"KY"},{"name":"Central African Republic","code":"CF"},{"name":"Chad","code":"TD"},{"name":"Chile","code":"CL"},{"name":"China","code":"CN"},{"name":"Christmas Island","code":"CX"},{"name":"Cocos (Keeling) Islands","code":"CC"},{"name":"Colombia","code":"CO"},{"name":"Comoros","code":"KM"},{"name":"Congo","code":"CG"},{"name":"Congo, The Democratic Republic of the","code":"CD"},{"name":"Cook Islands","code":"CK"},{"name":"Costa Rica","code":"CR"},{"name":"Cote D\"Ivoire","code":"CI"},{"name":"Croatia","code":"HR"},{"name":"Cuba","code":"CU"},{"name":"Cyprus","code":"CY"},{"name":"Czech Republic","code":"CZ"},{"name":"Denmark","code":"DK"},{"name":"Djibouti","code":"DJ"},{"name":"Dominica","code":"DM"},{"name":"Dominican Republic","code":"DO"},{"name":"Ecuador","code":"EC"},{"name":"Egypt","code":"EG"},{"name":"El Salvador","code":"SV"},{"name":"Equatorial Guinea","code":"GQ"},{"name":"Eritrea","code":"ER"},{"name":"Estonia","code":"EE"},{"name":"Ethiopia","code":"ET"},{"name":"Falkland Islands (Malvinas)","code":"FK"},{"name":"Faroe Islands","code":"FO"},{"name":"Fiji","code":"FJ"},{"name":"Finland","code":"FI"},{"name":"France","code":"FR"},{"name":"French Guiana","code":"GF"},{"name":"French Polynesia","code":"PF"},{"name":"French Southern Territories","code":"TF"},{"name":"Gabon","code":"GA"},{"name":"Gambia","code":"GM"},{"name":"Georgia","code":"GE"},{"name":"Germany","code":"DE"},{"name":"Ghana","code":"GH"},{"name":"Gibraltar","code":"GI"},{"name":"Greece","code":"GR"},{"name":"Greenland","code":"GL"},{"name":"Grenada","code":"GD"},{"name":"Guadeloupe","code":"GP"},{"name":"Guam","code":"GU"},{"name":"Guatemala","code":"GT"},{"name":"Guernsey","code":"GG"},{"name":"Guinea","code":"GN"},{"name":"Guinea-Bissau","code":"GW"},{"name":"Guyana","code":"GY"},{"name":"Haiti","code":"HT"},{"name":"Heard Island and Mcdonald Islands","code":"HM"},{"name":"Holy See (Vatican City State)","code":"VA"},{"name":"Honduras","code":"HN"},{"name":"Hong Kong","code":"HK"},{"name":"Hungary","code":"HU"},{"name":"Iceland","code":"IS"},{"name":"India","code":"IN"},{"name":"Indonesia","code":"ID"},{"name":"Iran, Islamic Republic Of","code":"IR"},{"name":"Iraq","code":"IQ"},{"name":"Ireland","code":"IE"},{"name":"Isle of Man","code":"IM"},{"name":"Israel","code":"IL"},{"name":"Italy","code":"IT"},{"name":"Jamaica","code":"JM"},{"name":"Japan","code":"JP"},{"name":"Jersey","code":"JE"},{"name":"Jordan","code":"JO"},{"name":"Kazakhstan","code":"KZ"},{"name":"Kenya","code":"KE"},{"name":"Kiribati","code":"KI"},{"name":"Korea, Democratic People\"S Republic of","code":"KP"},{"name":"Korea, Republic of","code":"KR"},{"name":"Kuwait","code":"KW"},{"name":"Kyrgyzstan","code":"KG"},{"name":"Lao People\"S Democratic Republic","code":"LA"},{"name":"Latvia","code":"LV"},{"name":"Lebanon","code":"LB"},{"name":"Lesotho","code":"LS"},{"name":"Liberia","code":"LR"},{"name":"Libyan Arab Jamahiriya","code":"LY"},{"name":"Liechtenstein","code":"LI"},{"name":"Lithuania","code":"LT"},{"name":"Luxembourg","code":"LU"},{"name":"Macao","code":"MO"},{"name":"Macedonia, The Former Yugoslav Republic of","code":"MK"},{"name":"Madagascar","code":"MG"},{"name":"Malawi","code":"MW"},{"name":"Malaysia","code":"MY"},{"name":"Maldives","code":"MV"},{"name":"Mali","code":"ML"},{"name":"Malta","code":"MT"},{"name":"Marshall Islands","code":"MH"},{"name":"Martinique","code":"MQ"},{"name":"Mauritania","code":"MR"},{"name":"Mauritius","code":"MU"},{"name":"Mayotte","code":"YT"},{"name":"Mexico","code":"MX"},{"name":"Micronesia, Federated States of","code":"FM"},{"name":"Moldova, Republic of","code":"MD"},{"name":"Monaco","code":"MC"},{"name":"Mongolia","code":"MN"},{"name":"Montenegro","code":"ME"},{"name":"Montserrat","code":"MS"},{"name":"Morocco","code":"MA"},{"name":"Mozambique","code":"MZ"},{"name":"Myanmar","code":"MM"},{"name":"Namibia","code":"NA"},{"name":"Nauru","code":"NR"},{"name":"Nepal","code":"NP"},{"name":"Netherlands","code":"NL"},{"name":"Netherlands Antilles","code":"AN"},{"name":"New Caledonia","code":"NC"},{"name":"New Zealand","code":"NZ"},{"name":"Nicaragua","code":"NI"},{"name":"Niger","code":"NE"},{"name":"Nigeria","code":"NG"},{"name":"Niue","code":"NU"},{"name":"Norfolk Island","code":"NF"},{"name":"Northern Mariana Islands","code":"MP"},{"name":"Norway","code":"NO"},{"name":"Oman","code":"OM"},{"name":"Pakistan","code":"PK"},{"name":"Palau","code":"PW"},{"name":"Palestinian Territory, Occupied","code":"PS"},{"name":"Panama","code":"PA"},{"name":"Papua New Guinea","code":"PG"},{"name":"Paraguay","code":"PY"},{"name":"Peru","code":"PE"},{"name":"Philippines","code":"PH"},{"name":"Pitcairn","code":"PN"},{"name":"Poland","code":"PL"},{"name":"Portugal","code":"PT"},{"name":"Puerto Rico","code":"PR"},{"name":"Qatar","code":"QA"},{"name":"Reunion","code":"RE"},{"name":"Romania","code":"RO"},{"name":"Russian Federation","code":"RU"},{"name":"RWANDA","code":"RW"},{"name":"Saint Helena","code":"SH"},{"name":"Saint Kitts and Nevis","code":"KN"},{"name":"Saint Lucia","code":"LC"},{"name":"Saint Pierre and Miquelon","code":"PM"},{"name":"Saint Vincent and the Grenadines","code":"VC"},{"name":"Samoa","code":"WS"},{"name":"San Marino","code":"SM"},{"name":"Sao Tome and Principe","code":"ST"},{"name":"Saudi Arabia","code":"SA"},{"name":"Senegal","code":"SN"},{"name":"Serbia","code":"RS"},{"name":"Seychelles","code":"SC"},{"name":"Sierra Leone","code":"SL"},{"name":"Singapore","code":"SG"},{"name":"Slovakia","code":"SK"},{"name":"Slovenia","code":"SI"},{"name":"Solomon Islands","code":"SB"},{"name":"Somalia","code":"SO"},{"name":"South Africa","code":"ZA"},{"name":"South Georgia and the South Sandwich Islands","code":"GS"},{"name":"Spain","code":"ES"},{"name":"Sri Lanka","code":"LK"},{"name":"Sudan","code":"SD"},{"name":"Suriname","code":"SR"},{"name":"Svalbard and Jan Mayen","code":"SJ"},{"name":"Swaziland","code":"SZ"},{"name":"Sweden","code":"SE"},{"name":"Switzerland","code":"CH"},{"name":"Syrian Arab Republic","code":"SY"},{"name":"Taiwan, Province of China","code":"TW"},{"name":"Tajikistan","code":"TJ"},{"name":"Tanzania, United Republic of","code":"TZ"},{"name":"Thailand","code":"TH"},{"name":"Timor-Leste","code":"TL"},{"name":"Togo","code":"TG"},{"name":"Tokelau","code":"TK"},{"name":"Tonga","code":"TO"},{"name":"Trinidad and Tobago","code":"TT"},{"name":"Tunisia","code":"TN"},{"name":"Turkey","code":"TR"},{"name":"Turkmenistan","code":"TM"},{"name":"Turks and Caicos Islands","code":"TC"},{"name":"Tuvalu","code":"TV"},{"name":"Uganda","code":"UG"},{"name":"Ukraine","code":"UA"},{"name":"United Arab Emirates","code":"AE"},{"name":"United Kingdom","code":"GB"},{"name":"United States","code":"US"},{"name":"United States Minor Outlying Islands","code":"UM"},{"name":"Uruguay","code":"UY"},{"name":"Uzbekistan","code":"UZ"},{"name":"Vanuatu","code":"VU"},{"name":"Venezuela","code":"VE"},{"name":"Viet Nam","code":"VN"},{"name":"Virgin Islands, British","code":"VG"},{"name":"Virgin Islands, U.S.","code":"VI"},{"name":"Wallis and Futuna","code":"WF"},{"name":"Western Sahara","code":"EH"},{"name":"Yemen","code":"YE"},{"name":"Zambia","code":"ZM"},{"name":"Zimbabwe","code":"ZW"}]
  public resume

  public firstName
  public emailId
  public username
  public password
  public cpassword
  public titleValue = 'default'
  public dobDay = 'default'
  public dobMonth = 'default'
  public dobYear = 'default'
  public selectedCountry = 'default'
  public state
  public town
  public phoneNumber
  public mobileNumber
  public keySkills
  public currentExpFromYear
  public currentExpToYear
  public currentJobProfile
  public fnArea = 'default'
  public currentOrg
  public pastOrg
  public qualification = 'default'
  public specialization

  // errors msg
  public passwordNotMatch = ''
  public usernameRequired = ''
  public invalidEmail = ''
  public emailRequired = ''
  public passwordRequired = ''
  public titleRequired = ''
  public totalExpRequired = ''
  public fullnameRequired = ''
  public dayRequired = ''
  public monthRequired = ''
  public yearRequired = ''
  public countryRequired = ''
  public stateRequired = ''
  public keySkillsRequired = ''
  public fnAreaRequired = ''
  public selectedDesignation = 'default'
  public mobileNumberRequired = ''
  pastQualification: any;
  pastExpToYear: any;
  pastExpFromYear: any;
  pastJobProfile: any;
  fullName: any;
  totalExp: any = 'default';
  qualificationReq: string;
  resumeURL: any;

  constructor(private router: Router,
    public utilsService: UtilsService,
    public generalSerice: GeneralService) { }

  ngOnInit() {
    sessionStorage.clear()
    for (let i = 1; i <= 31; i++) {
      this.days.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      this.months.push(i)
    }
    for (let i = 1; i <= 30; i++) {
      this.experiece.push(i)
    }
    const year = new Date().getFullYear()
    for (let i = year; i >= 1960; i--) {
      this.years.push(i)
    }
    for (let i = year; i >= 1960; i--) {
      this.fromCurrentYears.push(i)
    }
    for (let i = year; i >= 1960; i--) {
      this.fromPastYears.push(i)
    }
  }

  nextClick() {
    if (this.showDiv1) {
      let errorFound = false

      this.usernameRequired = ''
      if (!this.username || this.username.trim() === '') {
        this.usernameRequired = 'Please enter username';
        errorFound = true
      }

      this.invalidEmail = ''
      this.emailRequired = ''
      if (!this.emailId || this.emailId.trim() === '') {
        this.emailRequired = 'Please enter email';
        errorFound = true
      } else if (!this.validateEmail(this.emailId)) {
        this.invalidEmail = 'Please enter valid email'
        errorFound = true
      }

      this.passwordNotMatch = ''
      this.passwordRequired = ''
      if (!this.password || !this.cpassword) {
        this.passwordRequired = 'Password and Confirm password are requried'
        errorFound = true
      } else if (this.password !== this.cpassword) {
        this.passwordNotMatch = 'Password not matching'
        errorFound = true
      }

      this.titleRequired = ''
      if(this.titleValue === 'default') {
        this.titleRequired = 'Please select title'
        errorFound = true
      }

      this.fullnameRequired = ''
      if (!this.fullName || this.fullName.trim() === '') {
        this.fullnameRequired = 'Please enter your name'
        errorFound = true
      }

      this.dayRequired = ''
      if(this.dobDay === 'default') {
        this.dayRequired = 'Please select day'
        errorFound = true
      }

      this.monthRequired = ''
      if(this.dobMonth === 'default') {
        this.monthRequired = 'Please select month'
        errorFound = true
      }

      this.yearRequired = ''
      if(this.dobYear === 'default') {
        this.yearRequired = 'Please select year'
        errorFound = true
      }
      
      this.totalExpRequired = ''
      if(this.totalExp === 'default') {
        this.totalExpRequired = 'Please select total experience'
        errorFound = true
      }
      
      this.countryRequired = ''
      if(this.selectedCountry === 'default') {
        this.countryRequired = 'Please select country'
        errorFound = true
      }
      
      this.fnAreaRequired = ''
      if(this.fnArea === 'default') {
        this.fnAreaRequired = 'Please select functional area'
        errorFound = true
      }

      this.stateRequired = ''
      if (!this.state || this.state.trim() === '') {
        this.stateRequired = 'Please enter state'
        errorFound = true
      }
      
      this.keySkillsRequired = ''
      if (!this.keySkills || this.keySkills.trim() === '') {
        this.keySkillsRequired = 'Please enter keyskills'
        errorFound = true
      }
      
      this.mobileNumberRequired = ''
      if (!this.mobileNumber || this.mobileNumber.trim() === '') {
        this.mobileNumberRequired = 'Please enter mobile number'
        errorFound = true
      }

      if (errorFound) return false
      this.showDiv1 = false
      this.showDiv2 = true
      return true
    }

    if (this.showDiv2) {
      let errorFound = false

      this.qualificationReq = ''
      if(this.qualification === 'default') {
        this.qualificationReq = 'Please select day'
        errorFound = true
      }

      if (errorFound) return false

      this.showDiv2 = false
      this.showDiv1 = true
      return true
    }
  }

  validateEmail(email) {
    if (!email) return false
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  goToScreen(path) {
    this.router.navigate([path])
  }

  signUp() {
    const formValid = this.nextClick()
    if (!formValid) return false
    const json = Object({})
    json.username = this.username
    json.email = this.emailId
    json.password = this.password
    json.title = this.titleValue
    json.fullname = this.fullName
    
    const birthDate = Object({})
    birthDate.day = Number(this.dobDay)
    birthDate.month = Number(this.dobMonth)
    birthDate.year = Number(this.dobYear)

    json.dob = birthDate
    json.country = this.selectedCountry
    json.state = this.state
    json.city = this.town
    json.phone_number = this.phoneNumber
    json.mobile_number = this.mobileNumber
    json.total_experience = Number(this.totalExp)
    json.key_skills = this.keySkills
    json.functional_area = this.fnArea
    json.education_qualification = this.qualification
    json.specialization = this.specialization
    
    const currentOrgDetails = Object({})
    currentOrgDetails.organization = this.currentOrg
    currentOrgDetails.designation = this.selectedDesignation
    currentOrgDetails.exp_from = Number(this.currentExpFromYear)
    currentOrgDetails.exp_to = Number(this.currentExpToYear)
    currentOrgDetails.job_profile = this.currentJobProfile

    json.current_organization_details = currentOrgDetails

    const pastOrgDetails = Object({})
    pastOrgDetails.organization = this.pastOrg
    pastOrgDetails.designation = this.pastQualification
    pastOrgDetails.exp_from = Number(this.pastExpFromYear)
    pastOrgDetails.exp_to = Number(this.pastExpToYear)
    pastOrgDetails.job_profile = this.pastJobProfile

    json.past_organization_details = pastOrgDetails
    json.resume_url = this.resumeURL

    console.log(JSON.stringify(json))

    this.utilsService.enableLoading = true;
    this.generalSerice.registerAPICall(json).subscribe((response) => {
      this.router.navigate(['/login'])
      this.utilsService.enableLoading = false;
      this.utilsService.showMessage('success', 'Success', 'Your are registered successfully!')
    }, (error) => {
      if (error && 'error' in error && 'message' in error.error) {
        this.utilsService.showMessage('error', 'Error', error.error.message)
      } else {
        this.utilsService.showMessage('error', 'Error', 'We are facing issue while your registration. Please contact us')
      }
      this.utilsService.enableLoading = false;
    })
  }

  onTitleChange(value) {
    this.titleValue = value
  }

  onDOBDayChange(value) {
    this.dobDay = value
  }
  
  onDOBDayMonth(value) {
    this.dobMonth = value
  }
  
  onDOBDayYear(value) {
    this.dobYear = value
  }
  
  onCountryChange(value) {
    this.selectedCountry = value
  }
  
  onSelectFnArea(value) {
    this.fnArea = value
  }
  
  onQualificationChange(value) {
    this.qualification = value
  }
  
  onPastDesigationChange(value) {
    this.pastQualification = value
  }
  
  onCurrentExpFromYearChange(value) {
    this.currentExpFromYear = value
    const year = new Date().getFullYear()
    this.toCurrentYears = []
    for (let i = value; i <= year; i++) {
      this.toCurrentYears.push(i)
    }
  }
  
  onPastExpFromYearChange(value) {
    this.pastExpFromYear = value
    const year = new Date().getFullYear()
    this.toPastYears = []
    for (let i = value; i <= year; i++) {
      this.toPastYears.push(i)
    }
  }
  
  onCurrentExpToYearChange(value) {
    this.currentExpToYear = value
  }
  
  onPastExpToYearChange(value) {
    this.pastExpToYear = value
  }
  
  onTotalExpChange(value) {
    this.totalExp = value
  }

  uploadResume(file) {
    if (!file) { return true }
    this.utilsService.enableLoading = true;
    this.formData.set('file', file[0], file.name);
    this.formData.set('dest', 'ProfilePictures');
    this.generalSerice.uploadFile(this.formData).subscribe((response) => {
      this.resumeURL = response.data.secure_url
      this.formData.delete('file')
      this.utilsService.enableLoading = false;
    }, (error) => {
      this.formData.delete('file')
      this.utilsService.enableLoading = false;
    })
  }

  onCurrentDesigationChange(value) {
    this.selectedDesignation = value
  }


}
