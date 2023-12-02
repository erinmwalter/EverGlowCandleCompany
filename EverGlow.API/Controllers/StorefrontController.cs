using EverGlow.DataAccess.DbModels;
using EverGlow.DataAccess.Repos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EverGlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StorefrontController : ControllerBase
    {
        private readonly IRepository<StorefrontItem> _storefrontRepo;

        public StorefrontController(IRepository<StorefrontItem> storefrontRepo)
        {
            _storefrontRepo = storefrontRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStorefrontItemsAsync()
        {
            var result = await _storefrontRepo.GetAll();

            return Ok(result);
        }

        [HttpGet]
        [Route("featured")]
        public async Task<IActionResult> GetAllFeaturedItemsAsync()
        {
            var result = await _storefrontRepo.GetAll();

            return Ok(result.Where(x => x.IsFeaturedItem));
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetOneByIdAsync(int id)
        {
            var result = await _storefrontRepo.GetAll();

            return Ok(result.Where(x => x.Id == id).FirstOrDefault());
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewStorefrontItemAsync([FromBody] StorefrontItem item)
        {
            var result = await _storefrontRepo.Create(item);

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStorefrontItemAsync([FromBody] StorefrontItem item)
        {
            var result = await _storefrontRepo.Update(item);

            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteItemAsync(StorefrontItem item)
        {
            await _storefrontRepo.Delete(item);

            return Ok("Deleted");
        }
    }
}
