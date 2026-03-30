package BACKEND.BACKEND.wallet.repository;

import BACKEND.BACKEND.wallet.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUserIdOrderByCreatedAtDesc(String userId);
}
