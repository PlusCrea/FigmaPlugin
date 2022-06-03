// Circular text sample code
// Turns a selected text node into a set of letters on a circular arc.

figma.showUI(__html__);
  
figma.ui.onmessage = async msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
      await figma.loadFontAsync({ family: "Inter", style: "Regular" })
  if (msg.type === 'ChangeName') {
   // await figma.loadFontAsync({ family: "Inter", style: "Regular" })
    
    if (figma.currentPage.selection.length !== 1) {
      return "Select a single node."
    }

    const node = figma.currentPage.selection[0]
    if (node.type !== 'TEXT') {
      return "Select a single text node."
    }
    //const text = "Text degisti" ;
    node.characters = msg.data
    //console.log("Data",msg.data);
    
  }
  
  if (msg.type === 'DateFormat') {
    if (figma.currentPage.selection.length !== 1) {
      return "Select a single node."
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
  if (msg.type === 'Avatar') {
    if (figma.currentPage.selection.length !== 1) {
      return "Select a single node."
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
/*
    let rect = figma.createRectangle();
    //rect.cornerRadius = cardPadding/4;
    rect.resize(100, 100 / (msg.image.width / msg.image.height));
		rect.fills = [{
			imageHash: img.hash,
			scaleMode: "FILL",
			scalingFactor: 0.5,
			type: "IMAGE",
    }];
    */
//    selected.appendChild(rect);

   //invertImages(selected)
    

  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (msg.type === 'cancel') {figma.closePlugin(); }
  
};


async function invertImages(node) {
  const newFills = []
  console.log("node.fills",node.fills);
  
  for (const paint of node.fills) {
    if (paint.type === 'IMAGE') {
      // Get the (encoded) bytes for this image.
      const image = figma.getImageByHash(paint.imageHash)
      const bytes = await image.getBytesAsync()
      console.log("image", paint);
      //paint.remove();

      // TODO: Do something with the bytes!
    }
  }
  node.fills = newFills
}
// MAIN PLUGIN CODE
/*
async function main(): Promise<string | undefined> {
  // Roboto Regular is the font that objects will be created with by default in
  // Figma. We need to wait for fonts to load before creating text using them.
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })


  // Make sure the selection is a single piece of text before proceeding.
  if (figma.currentPage.selection.length !== 1) {
    return "Select a single node."
  }

  const node = figma.currentPage.selection[0]
  if (node.type !== 'TEXT') {
    return "Select a single text node."
  }
  const text = "Text degisti";
  node.characters = text
  
}

main().then((message: string | undefined) => {
  figma.closePlugin(message)
})
*/