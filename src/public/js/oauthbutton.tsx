import React from 'react';
import { siteRoot } from './siteroot';

export function OAuthButton() {
    return (
        <div>
            <div id="g_id_onload"
                 data-client_id="425711147539-3foeia0vc7n80d3i7sgi2j6jblfgsmpo.apps.googleusercontent.com"
                 data-login_uri={siteRoot + "trygoogle"}
                 data-auto_prompt="false"
                 >
            </div>
            <div className="g_id_signin"
                 data-type="standard"
                 data-size="large"
                 data-theme="outline"
                 data-text="sign_in_with"
                 data-shape="rectangular"
                 data-logo_alignment="left">
            </div>
        </div>      
    /*
    <div className="g-signin2" 
         data-onsuccess="onSignIn" 
         data-theme="dark"
         data-client_id="425711147539-3foeia0vc7n80d3i7sgi2j6jblfgsmpo.apps.googleusercontent.com"
         data-login_uri={siteRoot + "trygoogle"}
         data-auto_prompt="false">            
    </div>  
    */
    );
}