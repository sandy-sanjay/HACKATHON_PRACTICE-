package BACKEND.BACKEND.wallet.controller;

import BACKEND.BACKEND.wallet.dto.TransactionRequest;
import BACKEND.BACKEND.wallet.model.Transaction;
import BACKEND.BACKEND.wallet.model.Wallet;
import BACKEND.BACKEND.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final WalletService walletService;

    /**
     * Placeholder method to simulate getting userId from JWT token.
     * In a production environment, this would be retrieved from the
     * SecurityContextHolder or a RequestAttribute set by a JWT filter.
     */
    private String getCurrentUserId(String testUserId) {
        // For testing purposes, if a header X-User-Id is passed, use it.
        // Otherwise, return a default for now.
        return testUserId != null ? testUserId : "default_user";
    }

    @PostMapping("/add")
    public ResponseEntity<Transaction> addTransaction(
            @RequestBody TransactionRequest request,
            @RequestHeader(value = "X-User-Id", required = false) String testUserId) {
        
        String userId = getCurrentUserId(testUserId);
        Transaction transaction = walletService.addTransaction(
                userId, 
                request.getAmount(), 
                request.getCategory()
        );
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Transaction>> getHistory(
            @RequestHeader(value = "X-User-Id", required = false) String testUserId) {
        
        String userId = getCurrentUserId(testUserId);
        List<Transaction> history = walletService.getTransactionHistory(userId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/wallet")
    public ResponseEntity<Wallet> getWallet(
            @RequestHeader(value = "X-User-Id", required = false) String testUserId) {
        
        String userId = getCurrentUserId(testUserId);
        Wallet wallet = walletService.getWallet(userId);
        return ResponseEntity.ok(wallet);
    }
}
