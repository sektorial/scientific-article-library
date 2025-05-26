package ua.com.ivolnov.sci_article_library.article;

import java.util.Set;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.ivolnov.sci_article_library.author.Author;
import ua.com.ivolnov.sci_article_library.author.AuthorService;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

@Service
@RequiredArgsConstructor
class ArticleService {

    private final ArticleMapper mapper;
    private final ArticleRepository repository;
    private final AuthorService authorService;

    @PostConstruct
    public void init() {
        final UUID uuid = UUID.randomUUID();
        final Author author = authorService.save(Author.builder()
                .firstName("John " + uuid)
                .lastName("Doe" + uuid)
                .build());
        repository.save(Article.builder()
                .title("This is a John Doe's article as of " + uuid)
                .author(author)
                .journal("Some journal")
                .year(1999)
                .build());
    }

    Set<ArticleDto> findAll() {
        return mapper.toDtos(repository.findAll());
    }

    ArticleDto findOne(final String id) throws EntityNotFound {
        final Article article = repository.findById(UUID.fromString(id))
                .orElseThrow(() -> new EntityNotFound("Article not found by ID=" + id));
        return mapper.toDto(article);
    }

    ArticleDto create(final ArticleDto articleDto) {
        final Article newArticle = mapper.toEntity(articleDto);
        final Article createdArticle = repository.save(newArticle);
        return mapper.toDto(createdArticle);
    }

    ArticleDto update(final String id, final ArticleDto articleDto) throws EntityNotFound {
        if (!repository.existsById(articleDto.getId())) {
            throw new EntityNotFound("Article not found by ID=" + id);
        }
        final Article articleWithUpdates = mapper.toEntity(articleDto);
        final Article updatedArticle = repository.save(articleWithUpdates);
        return mapper.toDto(updatedArticle);
    }

    void deleteById(final String id) {
        repository.deleteById(UUID.fromString(id));
    }

}
