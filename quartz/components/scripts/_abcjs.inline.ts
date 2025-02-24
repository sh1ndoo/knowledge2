

// document.addEventListener("nav", async () => {
//     let abcjsImport: any
//     if (!abcjsImport) {
//         // @ts-ignore
//         abcjsImport = await import("https://cdn.jsdelivr.net/npm/abcjs@6.2.2/dist/abcjs-basic-min.min.js")
//     }
//     const ABCJS = abcjsImport.default
//     const abcElements = document.querySelectorAll(".music-abc-container");
//     abcElements.forEach((element) => {
//         const abcNotation = element.getAttribute("data-abc");
//         const uniqueId = element.id;
//         if (abcNotation && uniqueId) {
//             ABCJS.renderAbc(uniqueId, abcNotation, {
//                 responsive: "resize"
//             });
//         }
//     });
// });



// let abcjsImport: any

// document.addEventListener("nav", async () => {
//   const center = document.querySelector(".center") as HTMLElement
//   const abcElements = center.querySelectorAll("div.music-abc-container") as NodeListOf<HTMLElement>
//   if (abcElements.length === 0) return

//   // Import abcjs only if not already imported
//   if (!abcjsImport) {
//     // @ts-ignore
//     abcjsImport = await import("https://cdn.jsdelivr.net/npm/abcjs@6.2.2/dist/abcjs-basic-min.min.js")
//   }

//   const abcjs = abcjsImport.default

//   abcElements.forEach((element, index) => {
//     const abcNotation = element.textContent || ""
//     const uniqueId = `abc-render-${index}`

//     // Clear the container and create a new element for rendering
//     element.innerHTML = `<div id="${uniqueId}"></div>`

//     // Render the ABC notation
//     abcjs.renderAbc(uniqueId, abcNotation, {
//       responsive: "resize",
//     })

//     // Function to handle resizing
//     const handleResize = () => {
//       abcjs.renderAbc(uniqueId, abcNotation, {
//         responsive: "resize",
//       })
//     }

//     // Add resize event listener
//     window.addEventListener("resize", handleResize)

//     // Cleanup function
//     window.addCleanup(() => {
//       window.removeEventListener("resize", handleResize)
//     })
//   })
// })
