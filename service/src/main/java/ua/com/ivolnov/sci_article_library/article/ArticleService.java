package ua.com.ivolnov.sci_article_library.article;

import java.util.Set;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

@Service
@RequiredArgsConstructor
class ArticleService {

    private final ArticleMapper mapper;
    private final ArticleRepository repository;

    Set<ScientificArticleDto> findAll() {
        return mapper.toDtos(repository.findAll());
    }

    ScientificArticleDto findOne(final String uuid) throws EntityNotFound {
        final ScientificArticle article = repository.findOne(uuid)
                .orElseThrow(() -> new EntityNotFound("Article not found by uuid=" + uuid));
        return mapper.toDto(article);
    }

    ScientificArticleDto create(final ScientificArticleDto articleDto) {
        final String newArticleUuid = UUID.randomUUID().toString();
        final ScientificArticle newArticle = mapper.toEntity(articleDto)
                .withUuid(newArticleUuid);
        final ScientificArticle createdArticle = repository.save(newArticle);
        return mapper.toDto(createdArticle);
    }

    ScientificArticleDto update(final String uuid, final ScientificArticleDto articleDto) throws EntityNotFound {
        if (!repository.exists(articleDto.uuid())) {
            throw new EntityNotFound("Article not found by uuid=" + uuid);
        }
        final ScientificArticle articleWithUpdates = mapper.toEntity(articleDto);
        final ScientificArticle updatedArticle = repository.save(articleWithUpdates);
        return mapper.toDto(updatedArticle);
    }

    void deleteById(final String id) {
        repository.deleteById(id);
    }

}
