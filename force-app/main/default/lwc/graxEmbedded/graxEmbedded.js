import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import loadLWCPaylod from '@salesforce/apex/GRAXEmbedLWCHelper.loadLWCPaylod';

export default class graxEmbedded extends NavigationMixin(LightningElement) {
  @api flexipageRegionWidth;
  @api objectApiName;
  @api recordId;
  @api sObject;
 
  @api iFrameSize = 400;

  @api apiUrl;
  @track iFrameUrl='';

  @api fields;
  @api setSelection;

  @api childLevels = 1;
  @api ignoreRecordLevelSecurity = false;
  @api additionalParams = '';
  @api recordsPerPage = 5;
  @api title;

  @track lwcPayload = null;

  async queryGRAX(){
    return await loadLWCPaylod({objectName:this.sObject,fields:this.fields,objectId:this.recordId,enforceRowSecurity:!this.ignoreRecordLevelSecurity});
  }

  async connectedCallback() {
    this.lwcPayload = await this.queryGRAX();
    this.iFrameUrl = `${this.lwcPayload.apiPath}/web/objects/${this.objectApiName}/records/${this.recordId}/children?embedded=true&${this.getParams()}`;
  }

  // Embedded Parameters
  getParams(){
    var paramFields = this.fields;
    var retVal = `autologin=true&childObject=${this.sObject}&includeFields=true&fields=${encodeURIComponent(paramFields)}`;
    if (this.title != "" && !this.title!=null && this.title!=undefined) {
      retVal+=`&title=${encodeURIComponent(this.title)}`;
    }
    if (this.childLevels!=null && this.childLevels > 0){
      retVal+=`&level=${this.childLevels}`;
    }
    if (this.recordsPerPage!=null && this.recordsPerPage > 0){
      retVal+=`&perPage=${this.recordsPerPage}`;
    }
    // If we add additional parameters we can still use existing LWC 
    if (this.additionalParams != "" && this.additionalParams!=null && this.additionalParams!=undefined) {
      retVal+='&' + this.additionalParams;
    }

    if (this.setSelection == 'Archived Data')
      retVal += '&deleteSource=grax';
    else if (this.setSelection == 'Deleted Data')
      retVal += '&deleteSource=salesforce';
    else if (this.setSelection == 'Archived + Deleted Data')
      retVal += '&deleteSource=any';

    return retVal;
  }  
}