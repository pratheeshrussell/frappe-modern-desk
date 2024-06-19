// IMPORTANT: add a hidden field to doc_type reject_reason

frappe.ui.form.on('Team Lunch', {
    refresh: (frm)=>{
        console.log(frm.doc.workflow_state)
        if(frm.doc.workflow_state == "Rejected"){
            const rejectMsg =`REJECT REASON: ${frm.doc.reject_reason}`;
            frm.dashboard.add_comment(rejectMsg, "red", true);
        }
    },
    before_workflow_action: async (frm) => {
        const stateChange = frm.selected_workflow_action;
        if (stateChange == 'Reject') {
            frappe.dom.unfreeze();
            return new Promise((resolve, reject) => {
                frappe.prompt({
                    fieldtype: 'Data',
                    label: __('Reason'),
                    fieldname: 'reason'
                }, data => {
                    if(!data.reason) {
                        reject();
                        return;
                    }
                    frappe.call({
                        method: "frappe.client.set_value",
                        freeze: true,
                        args: {
                            doctype: 'Team Lunch',
                            name: frm.doc.name,
                            fieldname: 'reject_reason',
                            value: data.reason,
                        },
                        callback: function (r) {
                            if (r.message) {
                                resolve(r.message);
                            } else {
                                reject();
                            }
                        }
                    });
                }, __('Reason for Rejection'), __('Submit'));
            })
        }
    },

    after_workflow_action: function (frm) {
        const stateChange = frm.doc.workflow_state;
        if (stateChange != 'Rejected') {
            frappe.call({
                method: "frappe.client.set_value",
                freeze: true,
                args: {
                    doctype: 'Team Lunch',
                    name: frm.doc.name,
                    fieldname: 'reject_reason',
                    value: "",
                },
                callback: function (r) {
                    //frappe.dom.unfreeze();
                }
            });
        }
    },

    after_save: function (frm) {
        frappe.db.set_value('Team Lunch', frm.doc.name, 'workflow_state',"Pending");
    }
})