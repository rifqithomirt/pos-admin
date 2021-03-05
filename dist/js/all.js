this.handleAjaxErrors = ( response ) => {
    if( !response.ok ) {
        alert(response.statusText);
    }
    return response;
}

this.showLoading = (element) => {
    let xml = '<span class="loading-fetch spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    $( element ).append(xml)
}

this.hideLoading = (element) => {
    let loadingElement = $( element ).find( 'span.loading-fetch' )
    $( loadingElement ).remove()
}
