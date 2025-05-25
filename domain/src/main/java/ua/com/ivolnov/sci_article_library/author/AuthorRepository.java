package ua.com.ivolnov.sci_article_library.author;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface AuthorRepository extends JpaRepository<Author, UUID> {
}
