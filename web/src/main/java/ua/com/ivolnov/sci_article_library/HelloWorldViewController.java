package ua.com.ivolnov.sci_article_library;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/web")
@Controller
public class HelloWorldViewController {

    @GetMapping("/article")
    public ModelAndView index() {
        return new ModelAndView("article/index");
    }

}
