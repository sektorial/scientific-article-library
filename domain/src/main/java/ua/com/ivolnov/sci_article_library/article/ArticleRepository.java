package ua.com.ivolnov.sci_article_library.article;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface ArticleRepository extends JpaRepository<ScientificArticle, UUID> {
}
