package ua.com.ivolnov.sci_article_library.article;

import java.util.Set;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/article")
class ArticleRestController {

    private final ArticleService articleService;

    @GetMapping
    @ResponseStatus(OK)
    public Set<ScientificArticle> getAllArticles() {
        return articleService.findAll();
    }

    @GetMapping("/{uuid}")
    @ResponseStatus(OK)
    public ScientificArticle getArticleById(@PathVariable @NotBlank final String uuid) throws EntityNotFound {
        return articleService.findOne(uuid);
    }


    @PostMapping
    @ResponseStatus(CREATED)
    public ScientificArticle createArticle(@RequestBody @Valid final ScientificArticle article) {
        return articleService.create(article);
    }

    @PutMapping("/{uuid}")
    @ResponseStatus(OK)
    public ScientificArticle updateArticle(@PathVariable @NotBlank final String uuid,
                                           @RequestBody @Valid final ScientificArticle articleDetails)
            throws EntityNotFound {
        return articleService.update(uuid, articleDetails);
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(NO_CONTENT)
    public void deleteArticle(@PathVariable @NotBlank String uuid) {
        articleService.deleteById(uuid);
    }

}
