package ua.com.ivolnov.sci_article_library.author;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.com.ivolnov.sci_article_library.common.exception.EntityNotFound;

@Service
@RequiredArgsConstructor
class AuthorService {

    private final AuthorMapper mapper;
    private final AuthorRepository repository;

    @PostConstruct
    public void init() {
        final long currentMillis = Instant.now().toEpochMilli();
        repository.save(Author.builder()
                .firstName("Igor " + currentMillis)
                .lastName("Volnov " + currentMillis)
                .build());
    }

    Set<AuthorDto> findAll() {
        return mapper.toDtos(repository.findAll());
    }

    AuthorDto findOne(final String id) throws EntityNotFound {
        final Author author = repository.findById(UUID.fromString(id))
                .orElseThrow(() -> new EntityNotFound("Author not found by ID=" + id));
        return mapper.toDto(author);
    }

    AuthorDto create(final AuthorDto authorDto) {
        final Author newAuthor = mapper.toEntity(authorDto);
        final Author createdAuthor = repository.save(newAuthor);
        return mapper.toDto(createdAuthor);
    }

    void deleteById(final String id) {
        repository.deleteById(UUID.fromString(id));
    }

}
