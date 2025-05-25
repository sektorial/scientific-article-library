package ua.com.ivolnov.sci_article_library.article;

import java.util.Set;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/article")
class ArticleRestController {

    private final ArticleService articleService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Set<ScientificArticleDto> getAllArticles() {
        return articleService.findAll();
    }

    @GetMapping("/{uuid}")
    @ResponseStatus(HttpStatus.OK)
    public ScientificArticleDto getArticleById(@PathVariable @NotBlank final String uuid) throws EntityNotFound {
        return articleService.findOne(uuid);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ScientificArticleDto createArticle(@RequestBody @Valid final ScientificArticleDto articleDto) {
        return articleService.create(articleDto);
    }

    @PutMapping("/{uuid}")
    @ResponseStatus(HttpStatus.OK)
    public ScientificArticleDto updateArticle(@PathVariable @NotBlank final String uuid,
                                              @RequestBody @Valid final ScientificArticleDto articleDto)
            throws EntityNotFound {
        return articleService.update(uuid, articleDto);
    }

    @DeleteMapping("/{uuid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteArticle(@PathVariable @NotBlank String uuid) {
        articleService.deleteById(uuid);
    }

}
