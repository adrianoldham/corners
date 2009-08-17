var Corners = Class.create({
    options: {
        "mode": null,                     // Need to set to null cause modes are defined after Corners class is setup (default is Corners.Modes.TwoCorners)
        "wrapperElementType": null,       // Leave null for no wrapper element
        "iePNGFixBlankPixel": null        // Null, uses iePNGFix default of "/images/blank.gif"
    },
    
    initialize: function(selector, options) {        
        this.options = Object.extend(Object.extend({ }, this.options), options || { });        
        
        // Default is Corners.Modes.TwoCorners
        if (this.options.mode == null) {
            this.options.mode = Corners.Modes.TwoCorners;
        }
        
        this.elements = $$(selector);
        
        this.setup();
    },
    
    setup: function() {
        this.elements.each(function(element) {
            // Pregrab the inner html since we'll be manipulating it
            var innerHTML = element.innerHTML;
            if (this.options.wrapperElementType != null) {
                element.innerHTML = "";
            }

            this.options.mode.each(function(internalElementName) {
                var internalElement;
                
                // If we're creating the middle element
                if (internalElementName == "middle") {
                    // Test to see if it should be created
                    if (this.options.wrapperElementType != null) {
                        // If so, create it with the specified wrapperElement
                        internalElement = new Element(this.options.wrapperElementType, { "class": internalElementName });
                        internalElement.innerHTML = innerHTML;
                    }
                } else {
                    // Otherwise create a span
                    internalElement = new Element("span", { "class": internalElementName });
                }

                if (internalElement != null) {
                    // Only apply iePNGFix if it's available
                    if (internalElement.iePNGFix) {
                        internalElement.iePNGFix(iePNGFixBlankPixel);
                    }
                    
                    element.insert(internalElement);
                }
            }.bind(this));
        }.bind(this));
    }
});

Corners.Modes = {
    "TwoCorners":     [ "left", "middle", "right" ],
    "FourCorners":    [ "topleft", "topright", "middle", "bottomleft", "bottomright" ]
};