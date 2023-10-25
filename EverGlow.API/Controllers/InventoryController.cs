using EverGlow.DataAccess.Repos.StoreInventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EverGlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IStoreInventoryRepo _inventoryRepo;

        public InventoryController(IStoreInventoryRepo inventoryRepo)
        {
            _inventoryRepo = inventoryRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInventoryItemsAsync()
        {
            var result = await _inventoryRepo.GetAllInventoryItemsAsync();

            return Ok(result);
        }
    }
}
