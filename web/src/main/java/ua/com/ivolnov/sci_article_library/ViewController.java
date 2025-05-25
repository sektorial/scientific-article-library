package ua.com.ivolnov.sci_article_library;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/web")
@Controller
public class ViewController {

    @GetMapping("/article")
    public ModelAndView article() {
        return new ModelAndView("article/index");
    }

    @GetMapping("/author")
    public ModelAndView author() {
        return new ModelAndView("author/index");
    }

}
