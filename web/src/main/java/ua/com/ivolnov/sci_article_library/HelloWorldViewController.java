package ua.com.ivolnov.sci_article_library;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HelloWorldViewController {

    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index/index");
        // add title to Model
        modelAndView.addObject("msg", "Hello");
        return modelAndView;
    }

}
