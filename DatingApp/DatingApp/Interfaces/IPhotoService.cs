using CloudinaryDotNet.Actions;

namespace DatingApp.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> addPhotoAsync(IFormFile file);
        Task<DeletionResult> deletePhotoAsync(string publicId);
    }
}
