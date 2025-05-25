package ua.com.ivolnov.sci_article_library.article;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

@Service
@RequiredArgsConstructor
class ArticleService {

    private final ArticleMapper mapper;
    private final ArticleRepository repository;

    @PostConstruct
    public void init() {
        final long currentMillis = Instant.now().toEpochMilli();
        repository.save(ScientificArticle.builder()
                .title("This is a John Doe's article as of " + currentMillis)
                .authors("John Doe")
                .journal("Some journal")
                .year("1999")
                .build());
    }

    Set<ScientificArticleDto> findAll() {
        return mapper.toDtos(repository.findAll());
    }

    ScientificArticleDto findOne(final String uuid) throws EntityNotFound {
        final ScientificArticle article = repository.findById(UUID.fromString(uuid))
                .orElseThrow(() -> new EntityNotFound("Article not found by uuid=" + uuid));
        return mapper.toDto(article);
    }

    ScientificArticleDto create(final ScientificArticleDto articleDto) {
        final ScientificArticle newArticle = mapper.toEntity(articleDto);
        final ScientificArticle createdArticle = repository.save(newArticle);
        return mapper.toDto(createdArticle);
    }

    ScientificArticleDto update(final String uuid, final ScientificArticleDto articleDto) throws EntityNotFound {
        if (!repository.existsById(articleDto.getId())) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        final ScientificArticle articleWithUpdates = mapper.toEntity(articleDto);
        final ScientificArticle updatedArticle = repository.save(articleWithUpdates);
        return mapper.toDto(updatedArticle);
    }

    void deleteById(final String id) {
        repository.deleteById(UUID.fromString(id));
    }

}
