package iconicle

import (
	"iconicle/assets"

	"github.com/zserge/webview"

	"fmt"
	"html/template"
)

var w webview.WebView

func Run() error {
	myHTML, err := assets.Asset("html/app.html")
	if err != nil {
		return err
	}

	myCSS, err := assets.Asset("css/app.css")
	if err != nil {
		return err
	}

	myJS, err := assets.Asset("js/app.js")
	if err != nil {
		return err
	}

	w = webview.New(true)
	w.SetTitle("iconicle")
	w.SetSize(640, 360, webview.HintMin)

	w.Init(string(myJS) + fmt.Sprintf(`
	window.addEventListener('DOMContentLoaded', () => {
		let css = "%s"
		var style = document.createElement('style');
		var head = document.head || document.getElementsByTagName('head')[0];
		style.setAttribute('type', 'text/css');
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	})`, template.JSEscapeString(string(myCSS))))

	w.Navigate(`data:text/html,` + string(myHTML))

	defer w.Destroy()

	w.Run()
	// Inject CSS

	return nil
}
