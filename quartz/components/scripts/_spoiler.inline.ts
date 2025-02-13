// This was made by perplexity

function handleSpoilerClick() {
    const spoilers = document.querySelectorAll(".spoiler-text") as NodeListOf<HTMLElement>
  
    spoilers.forEach((spoiler) => {
      function onClick() {
        spoiler.classList.toggle("revealed")
      }
  
      spoiler.addEventListener("click", onClick)
      window.addCleanup(() => spoiler.removeEventListener("click", onClick))
    })
  }
  
document.addEventListener("nav", handleSpoilerClick)