frappe.views.Workspace = class CustomWorkspace extends frappe.views.Workspace {
    constructor(wrapper) {
        super(wrapper);
    }
    show() {
        // hide side bar for particular view
        if (frappe.router?.current_route &&
            frappe.router.current_route.length > 1 &&
            frappe.router.current_route[0].toLowerCase() === "workspaces") {
            // side bar
            let elements = document.querySelectorAll('.layout-side-section');
            elements.forEach(element => {
                if (element) element.classList.add('hide-side-section');
            });

            // Toggle button
            let elements2 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .sidebar-toggle-btn');
            elements2.forEach(element2 => {
                if (element2) element2.classList.add('hide-side-section');
            });

            // button to navigate to menu
            let elements3 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .menu-open-btn');
            elements3.forEach(element3 => {
                if (element3) element3.classList.remove('hide-side-section');
            });
        } else {
            // side bar
            let elements = document.querySelectorAll('.layout-side-section');
            elements.forEach(element => {
                if (element) element.classList.remove('hide-side-section');
            });

            // Toggle button
            let elements2 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .sidebar-toggle-btn');
            elements2.forEach(element2 => {
                if (element2) element2.classList.remove('hide-side-section');
            });

            // button to navigate to menu
            let elements3 = document.querySelectorAll('div[data-page-route]:not([data-page-route="menu"]) .menu-open-btn');
            elements3.forEach(element3 => {
                if (element3) element3.classList.add('hide-side-section');
            });
        }

        // call the parent's show
        super.show();
    }
}