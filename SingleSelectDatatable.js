import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
export default class SingleSelectDatatable extends LightningElement {
    error;  
    columns = columns;
    contact=[];
    connectedCallback()
    {
        getContactList()
        .then((result,error) => {
            if (result) {
               this.contact=result;
            } else if (error) {
                console.error(error);
            }
        })
    }
    handleRowSelection = event => {
        var selectedRows=event.detail.selectedRows;
        if(selectedRows.length>1)
        {
            var el = this.template.querySelector('lightning-datatable');
            selectedRows=el.selectedRows=el.selectedRows.slice(1);
            this.showNotification();
            event.preventDefault();
            return;
        }
    }
    showNotification() {
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Only one row can be selected',
            variant: 'warning',
            mode: 'pester'
        });
        this.dispatchEvent(event);
    }
}
