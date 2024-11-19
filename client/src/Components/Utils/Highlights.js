import {isMobile} from 'react-device-detect';

export const highlights = (match) => {
    let url = match.highlights;
    if ( isMobile ) {
        url = url.replace("https://www.youtube.com/watch?v=", "intent://");
        url = url + "/#Intent;scheme=vnd.youtube;package=com.google.android.youtube;S.browser_fallback_url=market://details?id=com.google.android.youtube;end;";
    }
    // https://www.youtube.com/watch?v=xjw3MtM3IGA
    // intent://Htfw2s2oCvw/#Intent;scheme=vnd.youtube;package=com.google.android.youtube;S.browser_fallback_url=market://details?id=com.google.android.youtube;end;
    window.open(url, "Popup", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=720, height=720, top=30");
}