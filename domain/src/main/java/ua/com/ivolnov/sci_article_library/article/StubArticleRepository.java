package ua.com.ivolnov.sci_article_library.article;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
class StubArticleRepository implements ArticleRepository {

    private static final Map<String, ScientificArticle> ARTICLES = new HashMap<>();

    @PostConstruct
    public void init() {
        final String uuid = UUID.randomUUID().toString();
        final LocalDateTime now = LocalDateTime.now();
        ARTICLES.put(uuid, new ScientificArticle(uuid, "Article " + now, "John Doe", "Some journal " + now, "1999"));
    }

    public Set<ScientificArticle> findAll() {
        return Set.copyOf(ARTICLES.values());
    }

    public Optional<ScientificArticle> findOne(final String uuid) {
        return Optional.ofNullable(ARTICLES.get(uuid));
    }

    @Override
    public boolean exists(final String uuid) {
        return ARTICLES.containsKey(uuid);
    }

    public ScientificArticle save(final ScientificArticle article) {
        ARTICLES.put(article.uuid(), article);
        return article;
    }

    public void deleteById(final String id) {
        ARTICLES.remove(id);
    }

}
