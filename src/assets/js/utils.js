(function() {
    eu.utils = {
        // Global method for creating cookie
        // For creating cookie use this method ra.utils.createCookie(name, value, days, path, domain)
        // If any parameter is blank just pass blank quotes in it
        create: function(name, value, days, path, domain) {

            if (name.length === 0) {
                return;
            }

            var expires,pathValue;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toGMTString();
            } else {
                expires = '';
            }

            if(path){
                pathValue=path;
            } else{
                pathValue='';
            }

            if (domain) {
                document.cookie = name + '=' + value + expires + '; path=' + pathValue + '; domain=' + domain;
            } else {
                document.cookie = name + '=' + value + expires + '; path=' + pathValue;
            }
        },

        // Global method for read cookie
        // For read cookie use this method ra.utils.readCookie(name)
        read: function(name) {

            var expression = '(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)';
            return (name = new RegExp(expression).exec(document.cookie)) && name[1];
        },

        // Global method for eraseCookie cookie
        // For erase cookie use this method ra.utils.eraseCookie(name)
        // Here negative day is passed to remove the cookies. Negative date means cookies no more exist.

        erase: function(name) {
            this.create(name, '', -1, '', '');
        },
        getUrlParam: function(name) {
            // Read a page's GET URL and return the query parameter value.
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars[name];
        }

    }
}(et));
