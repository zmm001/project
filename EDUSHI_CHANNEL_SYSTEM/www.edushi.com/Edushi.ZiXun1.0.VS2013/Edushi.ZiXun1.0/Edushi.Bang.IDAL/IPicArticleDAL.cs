�}�� r 
  h[�K�W��a	��8��px�P �V�u'��V���������k?_��%xzf�Q{��H����� 3����cJ����l���ޘ�Y$ޜ�Z�}�N����q)�m���7uڃ�&ިqdj���%J�[�@+��z)��y�<[���z{Β��SLNLAi��Ɨ�RxuX1�J����Z������(h}.��_���>ұw����RU4L��:L�.��}��w.���_��A�05m���3ʰ�f6f�b����Կ$��t��#9k<B��{�V2i�bJ���t�ET�m�k8s(��D��̰�p�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�
* 备注描述： 
*************************************************************************************/
#endregion
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Edushi.Bang.Model;
namespace Edushi.Bang.IDAL
{
   public interface IPicArticleDAL
    {
       List<PicArticleModel> getPicArticleData(string sCityCode, int PT_ID, bool isRoot, int RecommendStatus, bool isHavePic, int topNum, string ids);
    }
}
