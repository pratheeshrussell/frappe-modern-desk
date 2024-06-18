frappe.router.render = function () {
    if (this.current_route[0]) {
        this.render_page();
    } else {
        // Show our menu page
        frappe.set_route(['app', 'modern-menu']);
    }
}