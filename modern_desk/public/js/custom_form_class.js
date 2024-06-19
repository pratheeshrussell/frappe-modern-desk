frappe.ui.form.Form = class CustomFrappeForm extends frappe.ui.form.Form  {
    constructor(doctype, parent, in_form, doctype_layout_name) {
        super(doctype, parent, in_form, doctype_layout_name);
    }
    refresh(docname) {
		var switched = docname ? true : false;

		removeEventListener("beforeunload", this.beforeUnloadListener, { capture: true });

		if (docname) {
			this.switch_doc(docname);
		}

		cur_frm = this;

		this.undo_manager.erase_history();

		if (this.docname) {
			// document to show
			this.save_disabled = false;
			// set the doc
			this.doc = frappe.get_doc(this.doctype, this.docname);

			// check permissions
			this.fetch_permissions();
			if (!this.has_read_permission()) {
				frappe.show_not_permitted(__(this.doctype) + " " + __(cstr(this.docname)));
				return;
			}

			// update grids with new permissions
			this.grids.forEach((table) => {
				table.grid.refresh();
			});

			// read only (workflow)
			this.read_only = frappe.workflow.is_read_only(this.doctype, this.docname);
			if (this.read_only) {
				this.set_read_only(true);
				//frappe.show_alert(__("This form is not editable due to a Workflow."));
			}

			// check if doctype is already open
			if (!this.opendocs[this.docname]) {
				this.check_doctype_conflict(this.docname);
			} else {
				if (this.check_reload()) {
					return;
				}
			}

			// do setup
			if (!this.setup_done) {
				this.setup();
			}

			// load the record for the first time, if not loaded (call 'onload')
			this.trigger_onload(switched);

			// if print format is shown, refresh the format
			// if(this.print_preview.wrapper.is(":visible")) {
			// 	this.print_preview.preview();
			// }

			if (switched) {
				if (this.show_print_first && this.doc.docstatus === 1) {
					// show print view
					this.print_doc();
				}
			}

			// set status classes
			this.$wrapper
				.removeClass("validated-form")
				.toggleClass("editable-form", this.doc.docstatus === 0)
				.toggleClass("submitted-form", this.doc.docstatus === 1)
				.toggleClass("cancelled-form", this.doc.docstatus === 2);

			this.show_conflict_message();
			this.show_submission_queue_banner();

			if (frappe.boot.read_only) {
				this.disable_form();
			}
		}
	}

}