 var fs = require('fs');

//figma.showUI(__html__);
figma.showUI(__html__, { width: 950, height: 450 });

figma.ui.onmessage = async (msg) => {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" })    

    //console.log("User", await figma.currentUser.id);
      // figma.ui.postMessage({ type: 'enable-element', user: figma.currentUser.id });
//console.log("select",figma.currentPage.selection.slice());

    //burada sadece id ve name i kaydedersek kolayca elemanı bulabiliyoruz.
  /*
    let arr = [];
    const node = figma.currentPage.findOne((node => node.id === "69:6"));
    arr.push(node)
    console.log("find", arr);
    figma.currentPage.selection = arr;
*/
    //await figma.clientStorage.setAsync("set", figma.currentPage.selection.slice());
    //console.log("set",await figma.clientStorage.getAsync("set"));

    if (msg.type === 'SelectDate') { 
        figma.currentPage.selection = await figma.clientStorage.getAsync("set");
    }

    
       if (figma.currentPage.selection.length !== 1 && msg.type !== 'Cancel') {
           console.log("Error");
           return "Select a single node."           
       }
    
    if (msg.type === 'ChangeName') { 
        console.log("msg", msg.data);
        figma.ui.postMessage({ type: 'enable-element', name: "convert" });
    }


    if (msg.type === 'AddIcon') {
        console.log("Icon",msg);
        
    }

    if (msg.type === 'Avatar') { 
        console.log("sec",figma.currentPage.selection.length);
        
            if (figma.currentPage.selection.length !== 1) {
                figma.notify(`Please select a fillable object`);
            }

         const selected = figma.currentPage.selection[0] as GeometryMixin
 
        let img = figma.createImage(msg.image);
        
        console.log("Yeni",img);
        selected.fills = [{
                imageHash: img.hash,
                scaleMode: "FILL",
                scalingFactor: 0.5,
                type: "IMAGE",
        }];
    }

    if (msg.type === 'DateFormat') {
    if (figma.currentPage.selection.length !== 1) {
         figma.notify(`Please select a fillable object`);
    }
    
    const node = figma.currentPage.selection[0]
    if (node.type !== 'TEXT') {
      return "Select a single text node."
    }
    let current_datetime = new Date()


    let formatted_date = ""

    if (msg.format == "format1")
    {
       formatted_date = current_datetime.toLocaleString("en-us", { year: "numeric",
      month: "2-digit",
      day: "2-digit",})
    }
    if (msg.format == "format2")
    {
       formatted_date = current_datetime.toLocaleString("tr-tr", { year: "numeric",
      month: "2-digit",
      day: "2-digit",})
    }
    
    console.log(formatted_date)
    node.characters = formatted_date
   // console.log("format",msg.format);
    
  }
    if (msg.type === 'create-rectangles') {
        figma.ui.resize(950,100);
     }

  /*
    if (msg.type === 'create-rectangles') {
        const nodes = [];

        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }

        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'create-rectangles',
            message: `Created ${msg.count} Rectangles`,
        });
    }
*/
     if (msg.type === 'Cancel') { 
        figma.closePlugin();    
    }
    
};
