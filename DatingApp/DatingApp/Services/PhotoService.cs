using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.Helpers;
using DatingApp.Interfaces;
using Microsoft.Extensions.Options;

namespace DatingApp.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account
             (
                   config.Value.CloudName,
                   config.Value.APIKey,
                   config.Value.APISecret
             );

            _cloudinary = new Cloudinary(acc);
        }
        public async Task<ImageUploadResult> addPhotoAsync(IFormFile file)
        {
            var imageUploadResult = new ImageUploadResult();
            if(file.Length > 0 )
            {
                using var stream = file.OpenReadStream();
                var imageUploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder = "da-net6"
                };
                imageUploadResult = await _cloudinary.UploadAsync(imageUploadParams);
            }

            return imageUploadResult;
        }

        public async Task<DeletionResult> deletePhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}
