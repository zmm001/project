�}�� r x  �lL���c��a	���۞���}�QEǈ�o�q>A4g4%��~��b�7m"V�XX1�mūLW��+�`���$�"���A����w���G�j��-MӨq���C:�ZQ�%R1���C������V?>���3Q��"��:{���H��`�
�^o���Y8�V,>�ʣ	�qJ|�w;	rN�+��h�^���E��¸�ˉg�2��[W�Z��#�\ �H���1�M��W��ov��K>]�"�\�d΅�U��7�gFB���^�r �x~w6�w��7f����+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�&^�F�FXڌ��]����
E��T�< ������y�{>o\�piEt8&�g�qV�<x0ZP|zT�q�nV˺@~�a�C�tͻ�%���j%p�~��-B��&b4H�����0,��ޮk*�\�� �+�cd����c�56���I��[��j�Z'+'LͨE��}Y���[�
��'��A4��4��KD�FT%���l��5�^E��#;HM]�r�TT{-�?'*X��K������1�Y�v�=0;�x�ǲ[�O�O	>��6�c��$�����H�\B����K>�nr�M�?%Z7)2���+_�f؂j�y��z[H`JV>i��n�#N����q��c�0Ş]�� ��!R��x�PH0ih.@�����́}�"yv��@��l7�����D�n�ۀ�ԭ��Pt���yL����Y@R�������`�nNq!�J�bAs:�@1��� ]�'/� 4]�q���ՕI~#ʖ[6��b�,��9=�d ��-l '4����c�ĳպA��d�?�/� 	]��2,r�	�����/�ꄦ�k��g~�ǰ���!�; �>��!+��|��jCd@����{�R�屻���˟J&�1��'����e�=<��u��*���ƍ~��wy�3�{AR��Sx�ZBV����%Tv��b��-B��-���1���)]A��T[��e_u)�xA���b9A�o����R��F f��.�+�A����zs��#�������z���Oe�����"�jR~
מMQ���f۸�N> JI@���{�1�F���/V^��S�A�m�@4��p�X�&㭴-	`|� ��
��	6�(��:j�9|UK�/�h&hW�"M�5��~/�s�
��v��=IAq덧��#�mLg��,��(�e��aT���9�ʼ$�f�Z̈�w&/�c��K��N:6f���`P�rvR��^����$���F����[[�e��K{�#cc��D��)n�d�!= null && __isset.message) {
      field.Name = "message";
      field.Type = TType.String;
      field.ID = 1;
      oprot.WriteFieldBegin(field);
      oprot.WriteString(Message);
      oprot.WriteFieldEnd();
    }
    oprot.WriteFieldStop();
    oprot.WriteStructEnd();
  }

  public override string ToString() {
    StringBuilder sb = new StringBuilder("IOError(");
    sb.Append("Message: ");
    sb.Append(Message);
    sb.Append(")");
    return sb.ToString();
  }

}

