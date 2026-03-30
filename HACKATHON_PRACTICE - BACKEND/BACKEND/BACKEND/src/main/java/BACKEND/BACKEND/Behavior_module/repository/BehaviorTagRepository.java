package BACKEND.BACKEND.Behavior_module.repository;

import BACKEND.BACKEND.Behavior_module.model.BehaviorTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BehaviorTagRepository extends JpaRepository<BehaviorTag, Long> {
    List<BehaviorTag> findByTransactionId(String transactionId);
}
