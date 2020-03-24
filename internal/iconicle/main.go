package iconicle

import (
	"github.com/zserge/webview"
	"iconicle/assets"

	"fmt"
	"html/template"
	"net/url"
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
	w.SetSize(512, 640, 0)

	w.Init(string(myJS))

	w.Navigate(`data:text/html,` + url.PathEscape(string(myHTML)))

	defer w.Destroy()

	// Inject CSS
	w.Eval(fmt.Sprintf(`(function(css){
		window.addEventListener('load', () => {
   	  var style = document.createElement('style');
   	  var head = document.head || document.getElementsByTagName('head')[0];
   	  style.setAttribute('type', 'text/css');
   	  if (style.styleSheet) {
   	  	style.styleSheet.cssText = css;
   	  } else {
   	  	style.appendChild(document.createTextNode(css));
			}
			head.appendChild(style);
		})
  })("%s")`, template.JSEscapeString(string(myCSS))))

	w.Run()

	return nil
}
