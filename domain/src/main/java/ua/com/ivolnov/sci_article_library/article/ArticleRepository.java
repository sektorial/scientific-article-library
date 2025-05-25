package ua.com.ivolnov.sci_article_library.article;

import java.util.Optional;
import java.util.Set;

interface ArticleRepository {

    Set<ScientificArticle> findAll();

    Optional<ScientificArticle> findOne(String uuid);

    boolean exists(String uuid);

    ScientificArticle save(ScientificArticle article);

    void deleteById(String id);

}
