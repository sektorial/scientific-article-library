package ua.com.ivolnov.sci_article_library;

import java.util.Set;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import ua.com.ivolnov.sci_article_library.author.AuthorDto;
import ua.com.ivolnov.sci_article_library.author.AuthorService;

@RequiredArgsConstructor
@RequestMapping("/web")
@Controller
public class ViewController {

    private final AuthorService authorService;

    @GetMapping("/article")
    public ModelAndView article() {
        final ModelAndView modelAndView = new ModelAndView("article/index");
        final Set<AuthorDto> allAuthors = authorService.findAll();
        modelAndView.getModel().put("allAuthors", allAuthors);
        return modelAndView;
    }

    @GetMapping("/author")
    public ModelAndView author() {
        return new ModelAndView("author/index");
    }

}
