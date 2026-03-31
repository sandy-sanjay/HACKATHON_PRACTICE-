package BACKEND.BACKEND.Behavior_module.service;

import BACKEND.BACKEND.Behavior_module.model.BehaviorTag;
import BACKEND.BACKEND.Behavior_module.model.Nudge;
import BACKEND.BACKEND.Behavior_module.repository.BehaviorTagRepository;
import BACKEND.BACKEND.Behavior_module.repository.NudgeRepository;
import BACKEND.BACKEND.wallet.model.Transaction;
import BACKEND.BACKEND.wallet.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BehaviorService {

    @Autowired
    private BehaviorTagRepository behaviorTagRepository;

    @Autowired
    private NudgeRepository nudgeRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public BehaviorTag tagTransaction(String userId, String transactionId, String mood) {
        BehaviorTag tag = new BehaviorTag();
        tag.setUserId(userId);
        tag.setTransactionId(transactionId);
        tag.setMood(mood);
        tag.setCreatedAt(LocalDateTime.now());
        return behaviorTagRepository.save(tag);
    }

    public Map<String, Object> generateInsights(String userId) {
        // Filter tags by userId
        List<BehaviorTag> allTags = behaviorTagRepository.findAll().stream()
                .filter(t -> userId.equals(t.getUserId()))
                .collect(Collectors.toList());

        // Fetch transactions to calculate real spending
        List<Transaction> userTransactions = transactionRepository.findByUserIdOrderByCreatedAtDesc(userId);
        Map<Long, Transaction> transactionMap = userTransactions.stream()
                .collect(Collectors.toMap(Transaction::getId, t -> t));

        // Group tags by mood and calculate totals
        Map<String, Double> moodSpending = new HashMap<>();
        Map<String, Long> moodCounts = new HashMap<>();
        double totalSpending = 0;

        for (BehaviorTag tag : allTags) {
            String mood = tag.getMood().toLowerCase();
            moodCounts.put(mood, moodCounts.getOrDefault(mood, 0L) + 1);
            
            try {
                Long txId = Long.parseLong(tag.getTransactionId());
                Transaction tx = transactionMap.get(txId);
                if (tx != null) {
                    double amount = tx.getAmount().doubleValue();
                    moodSpending.put(mood, moodSpending.getOrDefault(mood, 0.0) + amount);
                    totalSpending += amount;
                }
            } catch (Exception e) {
                // Ignore parsing errors for mock data/legacy formats
            }
        }

        List<Map<String, Object>> insightList = new ArrayList<>();
        double finalTotal = totalSpending;
        moodSpending.forEach((mood, amount) -> {
            Map<String, Object> data = new HashMap<>();
            data.put("mood", mood);
            data.put("amount", amount);
            data.put("percentage", finalTotal > 0 ? (amount / finalTotal) * 100 : 0);
            insightList.add(data);
        });

        // Add defaults if empty to avoid frontend crashes
        if (insightList.isEmpty()) {
            insightList.add(Map.of("mood", "Neutral", "amount", 0.0, "percentage", 100.0));
        }

        Map<String, Object> insights = new HashMap<>();
        insights.put("totalTagsTracked", allTags.size());
        insights.put("insights", insightList);
        
        long stressedCount = moodCounts.getOrDefault("stressed", 0L);
        long boredCount = moodCounts.getOrDefault("bored", 0L);
        
        String insightMessage;
        if (stressedCount > boredCount) {
            insightMessage = "Stress spending is high! Try a 5-minute break.";
        } else if (boredCount > stressedCount) {
            insightMessage = "Boredom is your trigger. Try a new hobby!";
        } else {
            insightMessage = allTags.isEmpty() ? "Start tracking to see patterns!" : "Your spending is emotionally balanced!";
        }
        
        insights.put("insight", insightMessage);
        insights.put("suggestedNudge", createMockNudge(stressedCount, boredCount));

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
        return nudge; 
    }
}
