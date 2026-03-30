package BACKEND.BACKEND.Behavior_module.repository;

import BACKEND.BACKEND.Behavior_module.model.Nudge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NudgeRepository extends JpaRepository<Nudge, Long> {
}
