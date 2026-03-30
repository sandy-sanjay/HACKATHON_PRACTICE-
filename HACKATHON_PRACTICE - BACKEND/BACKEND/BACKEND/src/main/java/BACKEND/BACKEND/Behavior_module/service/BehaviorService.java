package BACKEND.BACKEND.Behavior_module.service;

import BACKEND.BACKEND.Behavior_module.model.BehaviorTag;
import BACKEND.BACKEND.Behavior_module.model.Nudge;
import BACKEND.BACKEND.Behavior_module.repository.BehaviorTagRepository;
import BACKEND.BACKEND.Behavior_module.repository.NudgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BehaviorService {

    @Autowired
    private BehaviorTagRepository behaviorTagRepository;

    @Autowired
    private NudgeRepository nudgeRepository;

    public BehaviorTag tagTransaction(String transactionId, String mood) {
        BehaviorTag tag = new BehaviorTag();
        tag.setTransactionId(transactionId);
        tag.setMood(mood);
        tag.setCreatedAt(LocalDateTime.now());
        return behaviorTagRepository.save(tag);
    }

    public Map<String, Object> generateInsights() {
        // Mock AI-like insight logic
        List<BehaviorTag> allTags = behaviorTagRepository.findAll();
        
        long stressedCount = allTags.stream().filter(t -> "stressed".equalsIgnoreCase(t.getMood())).count();
        long boredCount = allTags.stream().filter(t -> "bored".equalsIgnoreCase(t.getMood())).count();
        
        String insightMessage;
        if (stressedCount > boredCount) {
            insightMessage = "You seem to be making a lot of stress-based transactions lately. Consider taking a breather before your next purchase.";
        } else if (boredCount > stressedCount) {
            insightMessage = "Boredom seems to be a trigger for your spending. Maybe try picking up a free hobby!";
        } else if (allTags.isEmpty()) {
            insightMessage = "No behavioral data yet. Keep tracking to get personalized insights.";
        } else {
            insightMessage = "Your spending mood is balanced. Keep up the good work!";
        }

        Map<String, Object> insights = new HashMap<>();
        insights.put("totalTagsTracked", allTags.size());
        insights.put("insight", insightMessage);
        
        // Also provide a relevant nudge
        Nudge suggestedNudge = createMockNudge(stressedCount, boredCount);
        insights.put("suggestedNudge", suggestedNudge);

        return insights;
    }

    private Nudge createMockNudge(long stressedCount, long boredCount) {
        Nudge nudge = new Nudge();
        if (stressedCount > boredCount) {
            nudge.setMessage("Pause! Is this purchase a stress response?");
            nudge.setTriggerType("High Stress");
        } else {
            nudge.setMessage("Are you buying this just because you're bored?");
            nudge.setTriggerType("Boredom Spending");
        }
        return nudge; // We could save this using nudgeRepository.save(nudge) if needed
    }
}
