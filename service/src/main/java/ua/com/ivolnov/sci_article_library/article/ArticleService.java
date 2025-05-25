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
        repository.save(Article.builder()
                .title("This is a John Doe's article as of " + currentMillis)
                .authors("John Doe")
                .journal("Some journal")
                .year("1999")
                .build());
    }

    Set<ArticleDto> findAll() {
        return mapper.toDtos(repository.findAll());
    }

    ArticleDto findOne(final String uuid) throws EntityNotFound {
        final Article article = repository.findById(UUID.fromString(uuid))
                .orElseThrow(() -> new EntityNotFound("Article not found by uuid=" + uuid));
        return mapper.toDto(article);
    }

    ArticleDto create(final ArticleDto articleDto) {
        final Article newArticle = mapper.toEntity(articleDto);
        final Article createdArticle = repository.save(newArticle);
        return mapper.toDto(createdArticle);
    }

    ArticleDto update(final String uuid, final ArticleDto articleDto) throws EntityNotFound {
        if (!repository.existsById(articleDto.getId())) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        final Article articleWithUpdates = mapper.toEntity(articleDto);
        final Article updatedArticle = repository.save(articleWithUpdates);
        return mapper.toDto(updatedArticle);
    }

    void deleteById(final String id) {
        repository.deleteById(UUID.fromString(id));
    }

}
