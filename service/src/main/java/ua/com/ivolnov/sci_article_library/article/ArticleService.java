package ua.com.ivolnov.sci_article_library.article;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

@Service
@RequiredArgsConstructor
class ArticleService {

    private static final Map<String, ScientificArticle> ARTICLES = new HashMap<>();

    private final ArticleMapper mapper;

    @PostConstruct
    public void init() {
        final String uuid = UUID.randomUUID().toString();
        final LocalDateTime now = LocalDateTime.now();
        ARTICLES.put(uuid, new ScientificArticle(uuid, "Article " + now, "John Doe", "Some journal " + now, "1999"));
    }

    Set<ScientificArticleDto> findAll() {
        return mapper.toDtos(ARTICLES.values());
    }

    ScientificArticleDto findOne(final String uuid) throws EntityNotFound {
        final ScientificArticle article = ARTICLES.get(uuid);
        if (article == null) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        return mapper.toDto(article);
    }

    ScientificArticleDto create(final ScientificArticleDto articleDto) {
        final String newArticleUuid = UUID.randomUUID().toString();
        final ScientificArticle newArticle = mapper.toEntity(articleDto)
                .withUuid(newArticleUuid);
        ARTICLES.put(newArticleUuid, newArticle);
        return mapper.toDto(newArticle);
    }

    ScientificArticleDto update(final String uuid, final ScientificArticleDto articleDto) throws EntityNotFound {
        if (!ARTICLES.containsKey(articleDto.uuid())) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        ARTICLES.put(uuid, mapper.toEntity(articleDto));
        return articleDto;
    }

    void deleteById(final String id) {
        ARTICLES.remove(id);
    }

}
