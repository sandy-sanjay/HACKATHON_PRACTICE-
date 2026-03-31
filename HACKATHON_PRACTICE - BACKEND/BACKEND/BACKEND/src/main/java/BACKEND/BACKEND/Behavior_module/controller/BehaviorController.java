package BACKEND.BACKEND.Behavior_module.controller;

import BACKEND.BACKEND.Behavior_module.dto.ApiResponse;
import BACKEND.BACKEND.Behavior_module.dto.BehaviorTagRequest;
import BACKEND.BACKEND.Behavior_module.model.BehaviorTag;
import BACKEND.BACKEND.Behavior_module.service.BehaviorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/behavior")
public class BehaviorController {

    @Autowired
    private BehaviorService behaviorService;

    // POST /api/behavior/tag
    @PostMapping("/tag")
    public ResponseEntity<ApiResponse<BehaviorTag>> tagTransaction(
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestBody BehaviorTagRequest request) {
        
        // Note: Actual token validation is expected to be handled by a global authentication filter
        BehaviorTag savedTag = behaviorService.tagTransaction(request.getTransactionId(), request.getMood());
        
        return ResponseEntity.ok(ApiResponse.success(savedTag, "Behavior tag saved successfully"));
    }

    // GET /api/behavior/insights
    @GetMapping("/insights")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getInsights(
            @RequestHeader(value = "Authorization", required = false) String token) {
        
        // Note: Actual token validation is expected to be handled by a global authentication filter
        Map<String, Object> insights = behaviorService.generateInsights();
        
        return ResponseEntity.ok(ApiResponse.success(insights, "Behavioral insights generated successfully"));
    }
}
