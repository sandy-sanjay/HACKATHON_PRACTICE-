package BACKEND.BACKEND.Behavior_module.controller;

import BACKEND.BACKEND.Behavior_module.model.BehaviorTag;
import BACKEND.BACKEND.Behavior_module.service.BehaviorService;
import BACKEND.BACKEND.auth.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/behavior")
@RequiredArgsConstructor
public class BehaviorController {

    private final BehaviorService behaviorService;

    @PostMapping("/tag")
    public ResponseEntity<ApiResponse<BehaviorTag>> tagTransaction(
            @RequestParam String transactionId,
            @RequestParam String mood) {
        try {
            BehaviorTag tag = behaviorService.tagTransaction(transactionId, mood);
            return ResponseEntity.ok(ApiResponse.success(tag, "Transaction tagged successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/insights")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getInsights() {
        try {
            Map<String, Object> insights = behaviorService.generateInsights();
            return ResponseEntity.ok(ApiResponse.success(insights, "Insights generated successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
