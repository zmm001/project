�}v� r �  7�W;b�����a	��U�u������O��\�����j�ܶ�@%���\%��@�yZ��'>Z�c�BQ�:��<���JECA�|T��c/o/�k�#����#J=j�����gNP�ۇ�-b��I�~�"�M�������v�@��暆/*�ӕ��^�o��d������e��MӤ����Mbe��*zy5mq�18��Y����x>�/!��&@C���slh�{���k���"��h��M��D�R�PZ^��h�'}�ӛ+��"?�bm�M��hN�=��B5-XR�i��ϻD�7�24��_��I�:i�$%!V�}�pNv�����"��$i�/ \]A�5�>��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�'X��5t�o�,Yb���q�zS,�t��A@�H�+|�g8��y>�&�66R��o�Ĥ}��<b���X2���Y�XG��W�H&p�b*�X�/![Kv����%��9�=������u��r�	��	'\��M�A���Y	��f��M�ʬ�.x��9s���n=�5���=_����|B;3�|�y���$t��pu$Y�BCZe�ʵ�3!X������L�.�]�ѷ^�ʍ��'\Ӎ9q�{��r�M��l�h%�RKd�ņ���+��}�b��
�$!�ڒ���o:S;��G
~;x=5���.} -WP�*��kɜS�;5��w}g�7?����Z�s7"n��`�ŷP�DXV�@Ъ�(�nE@Ľ}W�?7P�[�w�KMrsd���}L�R�����7���ᕳC��s�f3�v���o�b.!�Ndt�I�gy�n���\�1�a����s�Ѵ`��,��p��Ël�T�$Ӳ{{���5p{�vbq��?�s��%���31��<A�l#��:�@�����=,|oi�-@B��.�K���D*B{T̺��2T��X�����o�AecW'/ρ�<�#ʼ����T~�916/Ʉ��Bj��K�ʅU�@�w6�{�}D
I�d�ML�_:���1�eYI d��o�}w�ԡrӝE짉~��dX������%m�K������kN^HA�<�{�;!�sfM��41o�д襡����п,����QU�hG��pc
�CQ�2�'IBz�~��X���$Z��W�D�
����K�`�!C3��B\�$�4<�״B�s���J��vN��+I��lwQ��:h�
�?�D`RN����ľ��PO��5����H�Жe�N���J�N��0O��<�SQ�"�*�2�)N#v��:�C#@9��܍����"�=0�������YviX�i����w����xl�I��9(��|*�L���[&���"���̼,����!��"1�'���dȮ�|U��������f� +磗N**/
using System;
using System.Collections.Generic;
using System.Text;

namespace SharpICTCLAS
{
   internal class PathNode
   {
      public int nParent;
      public int nIndex;

      public PathNode(int parent, int index)
      {
         this.nParent = parent;
         this.nIndex = index;
      }
   }
}
