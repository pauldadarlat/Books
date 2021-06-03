sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
    (Controller, MessageToast) => {
        "use strict"
        return Controller.extend("org.ubb.books.controller.Books", {
            read: function() {
                var book=  this.getView().byId("idBooksTable").getSelectedItem();
        
                return book
            },

            get: function(){
                
                    const book = {
                        NrbooksAvailable: parseInt(this.byId("available").getValue()),
                        TotalNrBooks: parseInt(this.byId("total").getValue()),
                        PublishDate: this.byId("datepublished").getValue(),
                        Language: this.byId("language").getValue(),
                        Author: this.byId("author").getValue(),
                        Title: this.byId("title").getValue(),
                        Isbn: this.byId("isbn").getValue()
                    };
                    alert(book.Isbn)
                    return book
                
            },
            
            update: function () {
                const book = this.get()
                alert(book.Isbn)
                this.getView().getModel().update("/Books('" + book.Isbn + "')", book, {
                    success: () => {
                        MessageToast.show("Updated successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not update")
                    }
                })
            },
            

            onSelect(oEvent){
                var oCurrentBook=  this.getView().byId("idBooksTable").getSelectedItem();
                var isbn = oCurrentBook.getBindingContext().getProperty("Isbn");
                var author = oCurrentBook.getBindingContext().getProperty("Author");
                var title = oCurrentBook.getBindingContext().getProperty("Title");
                // var publishDate = oCurrentBook.getBindingContext().getProperty("DatePublished");
                var publishDate = oCurrentBook.getBindingContext().getProperty("PublishDate");
                var language = oCurrentBook.getBindingContext().getProperty("Language");
                var available = oCurrentBook.getBindingContext().getProperty("NrbooksAvailable");  
                var total = oCurrentBook.getBindingContext().getProperty("TotalNrBooks");

                this.getView().byId("isbn").setValue(isbn);
                this.getView().byId("author").setValue(author);
                this.getView().byId("title").setValue(title);
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-ddTHH:mm:ss" });   
                var dateFormatted = dateFormat.format(publishDate)
                this.getView().byId("datepublished").setValue(dateFormatted);
                this.getView().byId("language").setValue(language);
                this.getView().byId("available").setValue(available);
                this.getView().byId("total").setValue(total);

            },

            create(oEvent){
                // this.dialog = sap.ui.xmlfragment("createBook","org.ubb.books.view.dialog", this);
                // this.dialog.open(); 
                const book = this.get();
                this.getView().getModel().create("/Books", book,{
                    success: () => {

                    },
                    error: () => {
                        console.log("error")
                    }
                })

            },

            saveBook(oEvent){
            
            },

            closeDialog(oEvent){
                this.dialog.close();
            },

            delete(oEvent){
                const book = this.read()
                var isbn = book.getBindingContext().getProperty("Isbn");
                this.getView().getModel().remove("/Books('" + isbn + "')", null, {
                    success: () => {
                        MessageToast.show("Delete successfully")
                    },
                    error: () => {
                        MessageToast.show("Could not delete")
                    }
                })
            }
           
        })
    }
)