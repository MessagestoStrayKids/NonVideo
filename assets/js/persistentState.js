
const cbstate = JSON.parse(localStorage['CBState'] || '{}')
// Needs to be loaded after tags are present.
function LoadCBState() {
    // Get the current state from localstorage
    // State is stored as a JSON string
    // Loop through state array and restore checked
    // state for matching elements
    for(var i in cbstate) {
        var el = document.querySelector('input[name="' + i + '"]');
        if (el) el.checked = true;
    }
    
    // Get all checkboxes that you want to monitor state for
    var cb = document.getElementsByClassName('save-cb-state');
    
    // Loop through results and ...
    for(var i = 0; i < cb.length; i++) {
    
        //bind click event handler
        cb[i].addEventListener('click', function(evt) {
            // If checkboxe is checked then save to state
            if (this.checked) {
                cbstate[this.name] = true;
            }
            
            // Else remove from state
            else if (cbstate[this.name]) {
                delete cbstate[this.name];
            }
            
            // Persist state
            localStorage.CBState = JSON.stringify(cbstate);
            }
        );
    }
}

