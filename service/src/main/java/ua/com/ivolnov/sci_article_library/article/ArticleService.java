package ua.com.ivolnov.sci_article_library.article;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

@Service
class ArticleService {

    private static final Map<String, ScientificArticle> ARTICLES = new HashMap<>();

    public Set<ScientificArticle> findAll() {
        return Set.copyOf(ARTICLES.values());
    }

    public ScientificArticle findOne(final String uuid) throws EntityNotFound {
        final ScientificArticle article = ARTICLES.get(uuid);
        if (article == null) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        return article;
    }

    public ScientificArticle create(final ScientificArticle article) {
        final String newArticleUuid = UUID.randomUUID().toString();
        final ScientificArticle newArticle = new ScientificArticle(newArticleUuid, article.title(), article.authors(),
                article.journal(), article.year());
        ARTICLES.put(newArticleUuid, newArticle);
        return newArticle;
    }

    public ScientificArticle update(final String uuid, final ScientificArticle article) throws EntityNotFound {
        if (!ARTICLES.containsKey(article.uuid())) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        ARTICLES.put(uuid, article);
        return article;
    }

    public void deleteById(final String id) {
        ARTICLES.remove(id);
    }

    @PostConstruct
    public void init() {
        final String uuid = UUID.randomUUID().toString();
        final LocalDateTime now = LocalDateTime.now();
        ARTICLES.put(uuid, new ScientificArticle(uuid, "Article " + now, "John Doe", "Some journal " + now, "1999"));
    }
}
