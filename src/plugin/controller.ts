figma.showUI(__html__, { width: 1250, height: 150 });

figma.ui.onmessage = async (msg) => {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    /*Change Avatar*/
    if (msg.type === 'Avatar') { 
         const selected = figma.currentPage.selection[0] as GeometryMixin
 
        let img = figma.createImage(msg.image);
        selected.fills = [{
                imageHash: img.hash,
                scaleMode: "FILL",
                scalingFactor: 0.5,
                type: "IMAGE",
        }];
    }

    /*Change NAme*/
        if (msg.type === 'ChangeName') { 
        console.log("msg", msg.data);
        //figma.ui.postMessage({ type: 'enable-element', name: "convert" });
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
        
        node.characters = msg.data;
    }

 /*Change Phone Number*/
        if (msg.type === 'ChangePhoneNumber') { 
        console.log("msg", msg.data);
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
           
        node.characters = msg.data;
        }
    
    /*Change Phone Number*/
        if (msg.type === 'ChangeMail') { 
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
            var mail = Math.random().toString(36).substring(2, 11) + '@example.com';
            
            node.characters = mail;
    }
    /*Change  Number*/
        if (msg.type === 'ChangeNumber') { 
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
            var number = Math.floor(Math.random()*9999).toString();
            //console.log("mail",mail);
            
            node.characters = number;
        }
       /*Change  Date*/
        if (msg.type === 'ChangeDate') { 
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
        
            let current_datetime = new Date();           
            let formatted_date = current_datetime.toLocaleString("en-us", { year: "numeric",
                month: "2-digit",
                day: "2-digit",})
            
            node.characters = formatted_date;
        }
    
     /*Change  Serial No*/
        if (msg.type === 'ChangeSerialNo') { 
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
        
            var char = "123456ABCDEFGHI76wndixdzsfszfs2009765210ojfngdBNMUOP",
                serialLenght = 20,finalString ="",
            randomKey;
            
            for(var i=0;i<serialLenght; i++){
                randomKey= Math.floor(Math.random()*char.length);
                finalString+=char.substring(randomKey,randomKey+1);
            }
            node.characters = finalString;
        }
  
    /*Change Food*/
        if (msg.type === 'ChangeFood') { 
        console.log("msg", msg.data.name);
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
           
        node.characters = msg.data.name;
        }
    
      
    /*Change Singer*/
        if (msg.type === 'ChangeSigner') { 
        console.log("msg", msg.data.name);
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
           
        node.characters = msg.data.name;
        }
     /*Change Adres*/
        if (msg.type === 'ChangeAdres') { 
        console.log("msg", msg.data.name);
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
           
        node.characters = msg.data.name;
        }
    
         /*Change Company*/
        if (msg.type === 'ChangeCompany') { 
        console.log("msg", msg.data.name);
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
           
        node.characters = msg.data.name;
        }
     /*Change  Number*/
        if (msg.type === 'ChangeScore') { 
        const node = figma.currentPage.selection[0];
        //console.log("node.type",node.type);
        
        if (node.type !== 'TEXT') {
            return "Select a single text node."
        }
            var number = (Math.random()*100).toFixed(2).toString();
            //console.log("mail",mail);
            
            node.characters = number;
        }
    
    //LAst
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

    //figma.closePlugin();
};
